"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const questions = [
  {
    id: "need",
    text: "Do we need asset management software?",
    options: [
      { value: "yes", label: "Yes, we need more than a spreadsheet" },
      { value: "no", label: "No, a spreadsheet is sufficient for now" },
      { value: "unsure", label: "We're not sure" },
    ],
  },
  {
    id: "ready",
    text: "Are we ready for asset management software?",
    options: [
      { value: "yes", label: "Yes, we have good data and processes in place" },
      { value: "no", label: "No, we need to improve our data and processes first" },
      { value: "partial", label: "We're partially ready" },
    ],
  },
  {
    id: "budget",
    text: "Have we allocated budget for data maintenance and software upkeep?",
    options: [
      { value: "yes", label: "Yes, we have a dedicated budget" },
      { value: "no", label: "No, we haven't considered this yet" },
      { value: "partial", label: "We have some budget, but it may not be sufficient" },
    ],
  },
]

export function AssetManagementQuestionnaire() {
  const [answers, setAnswers] = useState({})

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Asset Management Software Readiness Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question) => (
          <div key={question.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
            <RadioGroup onValueChange={(value) => handleAnswer(question.id, value)}>
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <div className="mt-4 mb-4">
          <h4 className="font-semibold">Selected Answers:</h4>
          <pre className="mt-2 p-2 bg-gray-100 rounded">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
        <Button className="mt-4">Submit Assessment</Button>
      </CardContent>
    </Card>
  )
}

