"use client"


import { useRouter } from 'next/router';
import {  createForm, SubmitHandler, TextInput } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Card } from 'tp-kit/components/card';
import { Button } from 'tp-kit/components/button';
import { SectionContainer } from 'tp-kit/components/section-container';
import Link from 'next/link';
import {useZodI18n} from "tp-kit/components/providers";
import {useState} from "react";
import {createClient} from "@supabase/supabase-js";
import {NoticeMessage} from "tp-kit/components";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function inscriptionPage() {
    useZodI18n(z);
    const [notices, setNotices] = useState([]);
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
    function addError(message) {
        setNotices([...notices, {type: "error", message}]);
    }

    function addSuccess(message) {
        setNotices([...notices, {type: "success", message}]);
    }

    const handleSubmit = async (values) => {
        const signup = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options : {
                data: { name: values.name },
                emailRedirectTo: "http://localhost:3000/api/auth/callback",
            }
        })
        console.log(signup)
        if (signup.error) {
            addError(signup.error.message);
        } else {
            addSuccess("Votre inscription a bien été prise en compte. Validez votre adresse mail pour vous connecter");
        }
    }


  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
        <Card>
            {notices.map((notice, i) => (
                <NoticeMessage key={i}{...notice}/>
            ))}
            <form onSubmit={form.onSubmit(handleSubmit)}>
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


