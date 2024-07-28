"use client"
import { TextField, TextArea, Button, Callout, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuesPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<IssueForm>();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()
    return (
        <div className='max-w-xl'>
        {error &&
            (<Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>)
        }
        <form
            className='space-y-3'
            onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true)
                    await axios.post("/api/issues", data)
                    router.push('/issues') 
                } catch (error) {
                    setIsSubmitting(false)
                    setError('Unexpected error occured')
                }
            })}
        >
            <TextField.Root placeholder='Title' {...register('title', {required: true, minLength:1, maxLength: 255})}/>
            {errors.title && <Text color='red'>{errors.title.message}</Text>}
            <TextArea placeholder="Description" {...register('description', {required: true, minLength: 1})}/>
            {errors.description && <Text color='red'>{errors.description.message}</Text>}
            <Button disabled={isSubmitting}>
                Submit New Issue {isSubmitting && <Spinner/>}
            </Button>
        </form>
        </div>
    )
}

export default NewIssuesPage