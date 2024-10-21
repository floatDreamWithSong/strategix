'use client'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { MdError } from 'react-icons/md'

import SubmitButton from '@/components/submit-button'
import { authenticateByCredentials } from '@/lib/user'
import type SearchParams from '@/types/search-params'

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  const callbackUrl = searchParams.callbackUrl as string | undefined

  const authenticate = authenticateByCredentials.bind(undefined, callbackUrl)

  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  const { pending } = useFormStatus()

  return (
    <>
      <h2 className='text-2xl font-bold text-center text-gray-800'>
        登入以使用更多功能
      </h2>
      <form className='space-y-4' action={dispatch}>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            电子邮箱
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            密码
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <div className='flex items-center justify-between'>
          <a href='#' className='text-sm text-blue-600 hover:underline'>
            忘记密码？
          </a>
          <p className='text-sm text-gray-600'>
            没有账号？
            <a href='#' className='font-semibold text-blue-600 hover:underline'>
              注册
            </a>
          </p>
        </div>

        {errorMessage && (
          <div className='text-sm text-white bg-red-600 p-2 rounded-md flex items-center font-bold'>
            <MdError />
            &nbsp;{errorMessage}
          </div>
        )}

        <SubmitButton text='登录' />
      </form>
    </>
  )
}

export default Page
