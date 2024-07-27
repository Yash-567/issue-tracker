import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'


const NewIssuesPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'/>
        <TextArea placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuesPage