'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, MessageSquare, Video, Calendar, Book, Send, Mic, Settings, DollarSign, TrendingUp, PieChart } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

const colors = {
  cream: '#FFFDD0',
  lightGray: '#999999',
  mediumLightGray: '#777777',
  mediumGray: '#555555',
  darkGray: '#333333',
  veryDarkGray: '#111111',
  darkerGray: '#222222',
}

export function JfdiHubUpdated() {
  const [veeChatInput, setVeeChatInput] = useState('')
  const [maestroChatInput, setMaestroChatInput] = useState('')
  const { user } = useApp()
  const [workflows, setWorkflows] = useState([])

  useEffect(() => {
    if (user) {
      fetch('/api/workflows')
        .then(response => response.json())
        .then(data => setWorkflows(data))
        .catch(error => console.error('Error fetching workflows:', error))
    }
  }, [user])

  if (!user) {
    return <Login />
  }

  return (
    <div className="flex h-screen bg-[#333333] text-[#FFFDD0]">
      {/* Sidebar */}
      <aside className="w-20 bg-[#111111] flex flex-col items-center py-8">
        <Logo />
        <div className="flex-grow"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-xl text-[#FFFDD0] hover:bg-[#333333]"
              >
                <Settings size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="space-y-8">
          <Dashboard workflows={workflows} />
          <VeeUI chatInput={veeChatInput} setChatInput={setVeeChatInput} />
          <MaestroUI chatInput={maestroChatInput} setChatInput={setMaestroChatInput} />
        </div>
      </main>
    </div>
  )
}

function Logo() {
  return (
    <div className="w-16 space-y-2">
      <div className="w-16 h-16 bg-[#FFFDD0] rounded-xl flex items-center justify-center text-[#111111] font-bold text-xl">
        JFDI
      </div>
      <Button variant="outline" size="sm" className="w-full text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
        Create
      </Button>
      <Button variant="outline" size="sm" className="w-full text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
        Admin
      </Button>
      <Button variant="outline" size="sm" className="w-full text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
        Projects
      </Button>
      <Button variant="outline" size="sm" className="w-full text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
        Maestro
      </Button>
    </div>
  )
}

function VeeUI({ chatInput, setChatInput }) {
  return (
    <Card className="bg-[#333333] text-[#FFFDD0] border-[#555555]">
      <CardHeader>
        <CardTitle className="text-2xl">Vee - Time and Communication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <NextMeetingNotification />
        <ChatWindow />
        <QuickActions />
        <ChatInput value={chatInput} onChange={setChatInput} />
      </CardContent>
    </Card>
  )
}

function MaestroUI({ chatInput, setChatInput }) {
  return (
    <Card className="bg-[#333333] text-[#FFFDD0] border-[#555555]">
      <CardHeader>
        <CardTitle className="text-2xl">Maestro - Execution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DecisionRequired />
        <ChatWindow />
        <MaestroActions />
        <ChatInput value={chatInput} onChange={setChatInput} />
      </CardContent>
    </Card>
  )
}

function NextMeetingNotification() {
  return (
    <div className="bg-[#555555] p-4 rounded-lg flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Next Meeting: Product Team Sync</h3>
        <p className="text-sm opacity-80">In 15 minutes</p>
      </div>
      <Button variant="outline" className="text-[#FFFDD0] border-[#777777] bg-[#222222] hover:bg-[#555555]">
        Join
      </Button>
    </div>
  )
}

function DecisionRequired() {
  return (
    <div className="bg-[#555555] p-4 rounded-lg space-y-2">
      <h3 className="font-semibold">Decision Required: Headphone Amplifier PR Budget</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">From: Geoff</p>
          <p className="text-sm font-semibold">Summary: $35K</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="text-[#FFFDD0] border-[#777777] bg-[#222222] hover:bg-[#555555]">
            Approve
          </Button>
          <Button variant="outline" size="sm" className="text-[#FFFDD0] border-[#777777] bg-[#222222] hover:bg-[#555555]">
            Deny
          </Button>
          <Button variant="outline" size="sm" className="text-[#FFFDD0] border-[#777777] bg-[#222222] hover:bg-[#555555]">
            Review
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChatWindow() {
  return (
    <div className="h-40 bg-[#555555] rounded-lg p-4 overflow-y-auto space-y-4">
      <ChatMessage sender="AI" message="Hello! How can I assist you today?" />
      <ChatMessage sender="User" message="Can you summarize my tasks for today?" />
    </div>
  )
}

function ChatMessage({ sender, message }) {
  const isAI = sender === 'AI'
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-3/4 p-3 rounded-lg ${isAI ? 'bg-[#777777]' : 'bg-[#999999]'}`}>
        <p className="font-semibold mb-1">{sender}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { icon: <MessageSquare size={20} />, label: 'Email/Text' },
    { icon: <Video size={20} />, label: 'Voice/Video' },
    { icon: <Calendar size={20} />, label: 'Planning' },
    { icon: <Book size={20} />, label: 'Knowledge' },
  ]

  return (
    <div className="flex space-x-2">
      {actions.map((action, index) => (
        <Button key={index} variant="outline" className="flex-1 flex items-center justify-center py-2 text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
          {action.icon}
          <span className="ml-2 text-sm">{action.label}</span>
        </Button>
      ))}
    </div>
  )
}

function MaestroActions() {
  const actions = [
    { icon: <TrendingUp size={20} />, label: 'Strategy' },
    { icon: <DollarSign size={20} />, label: 'Revenue' },
    { icon: <PieChart size={20} />, label: 'Expenses' },
    { icon: <Book size={20} />, label: 'Knowledge' },
  ]

  return (
    <div className="flex space-x-2">
      {actions.map((action, index) => (
        <Button key={index} variant="outline" className="flex-1 flex items-center justify-center py-2 text-[#FFFDD0] border-[#555555] bg-[#222222] hover:bg-[#555555]">
          {action.icon}
          <span className="ml-2 text-sm">{action.label}</span>
        </Button>
      ))}
    </div>
  )
}

function ChatInput({ value, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-[#555555] border-[#777777] text-[#FFFDD0] placeholder-[#999999]"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#FFFDD0] hover:bg-[#555555]">
              <Mic size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button className="bg-[#222222] text-[#FFFDD0] hover:bg-[#555555]">
        <Send size={20} />
      </Button>
    </div>
  )
}