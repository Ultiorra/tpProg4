"use client"


import { useRouter } from 'next/router';
import {  createForm, SubmitHandler, TextInput } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Card } from 'tp-kit/components/card';
import { Button } from 'tp-kit/components/button';
import { SectionContainer } from 'tp-kit/components/section-container';
import Link from 'next/link';


export default function inscriptionPage() {
    const form =  useForm({
    validate: zodResolver(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
    })),
    initialValues: {
        email: '',
        password: '',
        name: '',
        },
});



  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
        <Card>
        
            <form onSubmit={form.onSubmit((data : any) => console.log(data))}>
              <TextInput
                name="name"
                placeholder="Name"
                label="Name"
                required
                {...form.getInputProps('name')}
                />
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
                {...form.getInputProps('password')}
                required
                />
                <Button type="submit">
                  Inscription
                </Button>
                <br/>
                <Link href="/connexion"> Se connecter</Link>
        </form>
        </Card>
    </SectionContainer>
  );
};


