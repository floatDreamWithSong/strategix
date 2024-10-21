import { auth } from '@/auth'
import '@/lib/database'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        hello
        <div>{session ? session.user.email : <>1111</>}</div>
        <Link href='/auth/signin'>signin</Link>
        <Link href='/auth/signout'>signout</Link>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
    </div>
  )
}
