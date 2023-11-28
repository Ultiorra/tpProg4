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
import {useEffect, useState} from 'react';
import {bool} from "prop-types";
import {useZodI18n, ZodI18nProvider} from "tp-kit/components/providers";

export default function connexionPage() {

    useZodI18n(z);
    const [notices, setNotices] = useState([]);
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

    function addError(message) {
        setNotices([...notices, {type: "error", message}]);
    }

    function addSuccess(message) {
        setNotices([...notices, {type: "success", message}]);
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
            <form onSubmit={form.onSubmit((values) => {
                if (values.name === 'errorCondition') {
                    addError("Cette adresse n'est pas disponible");
                } else {
                    addSuccess("Votre inscription a bien été prise en compte. Validez votre adresse mail pour vous connecter");
                }
            } )}>
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


