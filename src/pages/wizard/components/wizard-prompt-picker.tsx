import Button from '../../../components/buttons/button'
import usePromptsQuery from '../../../../src/lib/query/prompts/usePromptsQuery'
import SelectInput from '../../../../src/components/select/select-input'
import { useEffect } from 'react'
import Prompt from '../../../../src/lib/types/prompts/prompt'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface IProps {
    selectedPrompt?: Prompt
    setSelectedPrompt: (prompt: Prompt) => void
}

export default function WizardPromptPicker({ selectedPrompt, setSelectedPrompt }: IProps) {
    const { data: prompts = [] } = usePromptsQuery()
    const navigate = useNavigate()

    const promptOptions = prompts.map((prompt: Prompt) => prompt.name)

    useEffect(() => {
        if (prompts.length === 0) return
        const selected = prompts.find((p: Prompt) => p.name === selectedPrompt?.name)
        if (selected) {
            setSelectedPrompt(selected)
        } else {
            setSelectedPrompt(prompts[0])
        }
    }, [selectedPrompt, prompts])

    function handlePromptChange(promptName: string) {
        const selected = prompts.find((p: Prompt) => p.name === promptName)
        if (selected) {
            setSelectedPrompt(selected)
        }
    }

    return (
        <div className="flex w-full items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
                Back
            </Button>
            <div className="flex shrink grow items-center space-x-2">
                <p className="font-semibold">Prompt</p>
                <SelectInput
                    options={[{ items: promptOptions }]}
                    value={selectedPrompt?.name || ''}
                    onChange={handlePromptChange}
                />
            </div>
            <Button variant="secondary">Save</Button>
        </div>
    )
}
