import { Play } from 'lucide-react'
import React from 'react'
import { Button, ButtonProps, Spinner } from '@radix-ui/themes'

interface CustomButtonProps extends ButtonProps {
  executeCodeFn?: () => void;
  isLoading?: boolean;
  title: string;
}

function CustomButton({executeCodeFn, isLoading, title, ...props}: CustomButtonProps) {
  return (
    <Button
        onClick={executeCodeFn}
        disabled={isLoading}
        {...props}
        className="inline-flex bg-blue-600 items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
        {isLoading ? (
          <Spinner size={"3"}/>
        ) : (
        <Play className="w-4 h-4" />
        )}
        {title}
    </Button>
  )
}

export default CustomButton