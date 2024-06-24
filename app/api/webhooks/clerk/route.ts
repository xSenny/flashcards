import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  console.log('through 1')

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  console.log('ce plm')
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }


  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log(JSON.parse(body))

  if (eventType === 'user.created') {
    const {id, first_name, profile_image_url, email_addresses} = JSON.parse(body).data;
    const email: String = email_addresses[0].email_address;

    const user = await createUser({
      clerkId: id,
      email,
      firstName: first_name,
      imageUrl: profile_image_url
    })

    if (user) {
      await clerkClient.users.updateUserMetadata(id as string , {
        publicMetadata: {
          userId: user._id
        }
      })
    }

    return new Response('Created an user successfully', {status: 200})
    
  } else if (eventType === 'user.deleted') {
    const {id} = JSON.parse(body).data

    const deletedUser = await deleteUser(id)

    if (deletedUser) { return new Response('Deleted the user', {status: 200})}

  }

  return new Response('', { status: 200 })
}