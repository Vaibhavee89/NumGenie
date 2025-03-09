"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Percent, RotateCcw, Square, SquareIcon as SquareRoot, Trash2 } from "lucide-react"
import { History } from "./history"
import { motion } from "framer-motion"
import type React from "react"

const Calculator = () => {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
  const [memory, setMemory] = useState<number>(0)
  const [history, setHistory] = useState<string[]>([])
  const [currentOperation, setCurrentOperation] = useState<string>("")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isScientific, setIsScientific] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setTheme(prefersDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleScientific = () => {
    setIsScientific(!isScientific)
  }

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
      setCurrentOperation(currentOperation + digit)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
      setCurrentOperation(currentOperation + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      setCurrentOperation(currentOperation + "0.")
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
      setCurrentOperation(currentOperation + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
    setCurrentOperation("")
  }

  const clearHistory = () => {
    setHistory([])
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
      const newHistoryItem = `${firstOperand} ${operator} ${inputValue} = ${result}`
      setHistory([...history, newHistoryItem])
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
    setCurrentOperation(nextOperator === "=" ? "" : `${inputValue} ${nextOperator} `)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      case "^":
        return Math.pow(firstOperand, secondOperand)
      default:
        return secondOperand
    }
  }

  const percentage = () => {
    const currentValue = Number.parseFloat(display)
    const percentValue = currentValue / 100
    setDisplay(String(percentValue))
    setCurrentOperation(`${currentValue}% = ${percentValue}`)
    setHistory([...history, `${currentValue}% = ${percentValue}`])
  }

  const squareRoot = () => {
    const currentValue = Number.parseFloat(display)
    const sqrtValue = Math.sqrt(currentValue)
    setDisplay(String(sqrtValue))
    setCurrentOperation(`√${currentValue} = ${sqrtValue}`)
    setHistory([...history, `√${currentValue} = ${sqrtValue}`])
  }

  const square = () => {
    const currentValue = Number.parseFloat(display)
    const squaredValue = currentValue * currentValue
    setDisplay(String(squaredValue))
    setCurrentOperation(`${currentValue}² = ${squaredValue}`)
    setHistory([...history, `${currentValue}² = ${squaredValue}`])
  }

  const toggleSign = () => {
    const currentValue = Number.parseFloat(display)
    const toggledValue = -currentValue
    setDisplay(String(toggledValue))
    setCurrentOperation(`-${currentValue} = ${toggledValue}`)
  }

  const memoryAdd = () => {
    const currentValue = Number.parseFloat(display)
    setMemory(memory + currentValue)
    setCurrentOperation(`M+ ${currentValue}`)
  }

  const memorySubtract = () => {
    const currentValue = Number.parseFloat(display)
    setMemory(memory - currentValue)
    setCurrentOperation(`M- ${currentValue}`)
  }

  const memoryRecall = () => {
    setDisplay(String(memory))
    setCurrentOperation(`MR = ${memory}`)
  }

  const memoryClear = () => {
    setMemory(0)
    setCurrentOperation("MC")
  }

  // New scientific functions
  const sin = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.sin(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`sin(${currentValue}) = ${result}`)
    setHistory([...history, `sin(${currentValue}) = ${result}`])
  }

  const cos = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.cos(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`cos(${currentValue}) = ${result}`)
    setHistory([...history, `cos(${currentValue}) = ${result}`])
  }

  const tan = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.tan(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`tan(${currentValue}) = ${result}`)
    setHistory([...history, `tan(${currentValue}) = ${result}`])
  }

  const log = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.log10(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`log(${currentValue}) = ${result}`)
    setHistory([...history, `log(${currentValue}) = ${result}`])
  }

  const ln = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.log(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`ln(${currentValue}) = ${result}`)
    setHistory([...history, `ln(${currentValue}) = ${result}`])
  }

  const exp = () => {
    const currentValue = Number.parseFloat(display)
    const result = Math.exp(currentValue)
    setDisplay(String(result))
    setCurrentOperation(`e^${currentValue} = ${result}`)
    setHistory([...history, `e^${currentValue} = ${result}`])
  }

  const pi = () => {
    setDisplay(String(Math.PI))
    setCurrentOperation(`π = ${Math.PI}`)
  }

  const e = () => {
    setDisplay(String(Math.E))
    setCurrentOperation(`e = ${Math.E}`)
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const renderButton = (label: string | React.ReactNode, onClick: () => void, variant = "default") => (
    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
      <Button
        onClick={onClick}
        variant={variant as "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined}
        className={`w-full ${
          variant === "secondary"
            ? "bg-calc-operator hover:bg-calc-operator/90"
            : "bg-calc-number hover:bg-calc-number/90"
        } text-calc-text`}
      >
        {label}
      </Button>
    </motion.div>
  )

  return (
    <Card className={`w-96 ${theme === "dark" ? "bg-calc-bg text-calc-text" : "bg-white"}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Calculator</h2>
          <div className="flex gap-2">
            <Button onClick={toggleTheme} variant="ghost" size="sm">
              {theme === "light" ? "🌙" : "☀️"}
            </Button>
            <Button onClick={toggleScientific} variant="ghost" size="sm">
              {isScientific ? "Basic" : "Scientific"}
            </Button>
            <Button onClick={clearHistory} variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <History items={history} />
        <div className="mb-2 text-sm text-calc-text opacity-70 h-6 overflow-x-auto">{currentOperation}</div>
        <motion.div
          className="mb-4 text-right text-3xl font-bold h-10 overflow-x-auto bg-calc-display rounded-md p-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {display}
        </motion.div>
        <div className={`grid gap-2 ${isScientific ? "grid-cols-5" : "grid-cols-4"}`}>
          {renderButton("MC", memoryClear, "secondary")}
          {renderButton("MR", memoryRecall, "secondary")}
          {renderButton("M+", memoryAdd, "secondary")}
          {renderButton("M-", memorySubtract, "secondary")}
          {isScientific && renderButton("π", pi, "secondary")}

          {renderButton(<Percent className="h-4 w-4" />, percentage, "secondary")}
          {renderButton(<SquareRoot className="h-4 w-4" />, squareRoot, "secondary")}
          {renderButton(<Square className="h-4 w-4" />, square, "secondary")}
          {renderButton("/", () => performOperation("/"), "secondary")}
          {isScientific && renderButton("e", e, "secondary")}

          {renderButton("7", () => inputDigit("7"))}
          {renderButton("8", () => inputDigit("8"))}
          {renderButton("9", () => inputDigit("9"))}
          {renderButton("*", () => performOperation("*"), "secondary")}
          {isScientific && renderButton("sin", sin, "secondary")}

          {renderButton("4", () => inputDigit("4"))}
          {renderButton("5", () => inputDigit("5"))}
          {renderButton("6", () => inputDigit("6"))}
          {renderButton("-", () => performOperation("-"), "secondary")}
          {isScientific && renderButton("cos", cos, "secondary")}

          {renderButton("1", () => inputDigit("1"))}
          {renderButton("2", () => inputDigit("2"))}
          {renderButton("3", () => inputDigit("3"))}
          {renderButton("+", () => performOperation("+"), "secondary")}
          {isScientific && renderButton("tan", tan, "secondary")}

          {renderButton("+/-", toggleSign)}
          {renderButton("0", () => inputDigit("0"))}
          {renderButton(".", inputDecimal)}
          {renderButton("=", () => performOperation("="), "secondary")}
          {isScientific && renderButton("log", log, "secondary")}

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={isScientific ? "col-span-2" : "col-span-2"}
          >
            <Button onClick={clear} className="w-full bg-calc-action hover:bg-calc-action/90 text-calc-text">
              Clear
            </Button>
          </motion.div>
          {renderButton("x^y", () => performOperation("^"), "secondary")}
          {renderButton(<RotateCcw className="h-4 w-4" />, () => {}, "secondary")}
          {isScientific && renderButton("ln", ln, "secondary")}
          {isScientific && renderButton("exp", exp, "secondary")}
        </div>
      </CardContent>
    </Card>
  )
}

export default Calculator

