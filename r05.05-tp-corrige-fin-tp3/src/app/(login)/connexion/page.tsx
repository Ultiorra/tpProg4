"use client"


import { useRouter } from 'next/router';
import {  createForm, SubmitHandler, TextInput } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Card } from 'tp-kit/components/card';
import { Button } from 'tp-kit/components/button';
import { SectionContainer } from 'tp-kit/components/section-container';
import Link from 'next/link';


export default function connexionPage() {
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



  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
        <Card>
        
            <form onSubmit={form.onSubmit((data :any ) => console.log(data))}>
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


