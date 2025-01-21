import { useState } from 'react'
import Prompt from '../../../src/lib/types/prompts/prompt'
import WizardResultDisplay from './components/wizard-result-display'
import WizardForm from './components/wizard-form'
import WizardPromptPicker from './components/wizard-prompt-picker'
import fetchStreamedResponse from '../../lib/fetchStreamedResponse'
import Portfolio from '../../../src/lib/types/portfolio/portfolio'

export default function Page() {
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt>()
    const [streamingResult, setStreamingResult] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (formData: Record<string, string>, selectedPortfolio: Portfolio['id']) => {
        setStreamingResult('') // Clear the previous result
        await fetchStreamedResponse(
            `/prompts/${selectedPrompt?.id}/execute`,
            {
                ...formData,
                portfolio_id: selectedPortfolio,
                stream: true
            },
            setLoading,
            (chunk) => {
                setStreamingResult((prev) => prev + chunk)
            }
        )
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex border-b p-5">
                <WizardPromptPicker selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} />
            </div>
            <div className="flex flex-1 space-x-4 p-5">
                <div className="flex w-7/12 flex-col space-y-3">
                    <WizardResultDisplay streamingResult={streamingResult} />
                </div>
                <div className="w-5/12">
                    <WizardForm selectedPrompt={selectedPrompt} onSubmit={onSubmit} isLoading={loading} />
                </div>
            </div>
        </div>
    )
}
