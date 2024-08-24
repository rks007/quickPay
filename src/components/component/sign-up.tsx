"use client"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import axios from "axios"

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const backendUrl = process.env.BackendUrl
    console.log(backendUrl)
    try {
      const response = await axios.post(`http://localhost:3000/api/signup`,{
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      }) 
      if (response.status === 200) {
        router.push("/api/auth/signin");
      } else {
        console.log('Signup failed:', response.status);
      }
    } catch (error) {
      alert('error while signing up')
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground text-lg">Enter your information to get started.</p>
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => router.push("api/auth/signin")} className="underline" >
            Login
          </button>
        </p>
      </div>
      <form className="space-y-6 rounded-lg border bg-background p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="first-name"
              placeholder="John"
              required
              className="rounded-md border-muted focus:border-primary focus:ring-primary"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="last-name"
              placeholder="Doe"
              required
              className="rounded-md border-muted focus:border-primary focus:ring-primary"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            required
            className="rounded-md border-muted focus:border-primary focus:ring-primary"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            className="rounded-md border-muted focus:border-primary focus:ring-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="button"
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}
