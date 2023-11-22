"use client"


import { useRouter } from 'next/router';
import {  createForm, SubmitHandler, TextInput } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Card } from 'tp-kit/components/card';
import { Button } from 'tp-kit/components/button';
import { SectionContainer } from 'tp-kit/components/section-container';
import Link from 'next/link';
import { NoticeMessage } from 'tp-kit/components/notice-message';
import { useState } from 'react';

export default function connexionPage() {

  const [error , setError] = useState(false);
  const [success , setSuccess] = useState(false);
    const form =  useForm({
    validate: zodResolver(z.object({
      email: z.string().email(),
      
      password: z.string().min(6),
    })),
    initialValues: {
        email: '',
        password: '',
        },
});

 const onSubmit = (data : any) => {
    if (true){
      setSuccess(true);
    }
    else{
      setError(true);
    }
  }



  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >

        <Card>
        
        
        {
          error && <NoticeMessage
    
         onDismiss={setError(false)}
          message="Email ou mot de passe incorrect"
          type="error"
        />
        }
        {
          success && <NoticeMessage
  
         onDismiss={setSuccess(false)}
          message="Connexion réussie"
          type="success"
        />
}
            <form onSubmit={form.onSubmit((data :any ) => onSubmit(data))}>
                <TextInput
                name="email"
                placeholder="Email"
                label="Email"
                required
                {...form.getInputProps('email')}
                />
                <TextInput
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                required
                {...form.getInputProps('password')}
                />
                <Button type="submit"> Connexion </Button>  
                <br/>
                <Link href="/inscription"> Créer un compte</Link>
        </form>
        </Card>
    </SectionContainer>
  );
};


