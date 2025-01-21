import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/button'
import { Label } from '../../../../src/components/ui/label'
import { Textarea } from '../../../../src/components/ui/textarea'
import SelectInput from '../../../../src/components/select/select-input'
import Prompt from '../../../../src/lib/types/prompts/prompt'
import PromptField from '../../../../src/lib/types/prompts/promptField'
import usePortfoliosQuery from '../../../../src/lib/query/portfolios/usePortfoliosQuery'
import Portfolio from '../../../../src/lib/types/portfolio/portfolio'

interface IProps {
    selectedPrompt?: Prompt
    isLoading: boolean
    onSubmit: (formData: Record<string, string>, selectedPortfolioId: Portfolio['id']) => void
}

export default function WizardForm({ selectedPrompt, isLoading, onSubmit }: IProps) {
    const { data: portfolios = [] } = usePortfoliosQuery()

    const [promptFields, setPromptFields] = useState<PromptField[]>([])
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | undefined>(portfolios[0])

    const [formValues, setFormValues] = useState<Record<string, string>>({})

    useEffect(() => {
        setPromptFields(selectedPrompt?.fields || [])
        setFormValues(
            selectedPrompt?.fields.reduce((acc: Record<string, string>, field: PromptField) => {
                acc[field.inputName] = ''
                return acc
            }, {}) || {}
        )
    }, [selectedPrompt])

    useEffect(() => {
        if (portfolios.length > 0) {
            setSelectedPortfolio(portfolios[0])
        }
    }, [portfolios])

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value
        }))
    }

    const handleSubmit = () => {
        if (selectedPortfolio) {
            onSubmit(formValues, selectedPortfolio.id) // Pass the portfolio ID
        }
    }

    const renderField = (field: PromptField) => {
        switch (field.inputType) {
            case 'text':
                return (
                    <div key={field.inputName} className="grid w-full gap-1.5">
                        <Label htmlFor={field.inputName}>{field.displayName}</Label>
                        <input
                            type="text"
                            id={field.inputName}
                            value={formValues[field.inputName] || ''}
                            onChange={(e) => handleFieldChange(field.inputName, e.target.value)}
                            placeholder={field.displayName}
                            required={field.required}
                            className="input"
                        />
                    </div>
                )
            case 'textarea':
                return (
                    <div key={field.inputName} className="grid w-full gap-1.5">
                        <Label htmlFor={field.inputName}>{field.displayName}</Label>
                        <Textarea
                            id={field.inputName}
                            value={formValues[field.inputName] || ''}
                            onChange={(e) => handleFieldChange(field.inputName, e.target.value)}
                            placeholder={field.displayName}
                            required={field.required}
                            className="min-h-[40px]"
                        />
                    </div>
                )
            case 'select':
                const fieldOptions = field.options?.map((option) => option.option) || []
                return (
                    <div key={field.inputName} className="grid w-full gap-1.5">
                        <Label htmlFor={field.inputName}>{field.displayName}</Label>
                        <SelectInput
                            placeholder="Select an option"
                            options={[{ items: fieldOptions }]}
                            value={formValues[field.inputName]}
                            onChange={(value) => handleFieldChange(field.inputName, value)}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="flex h-full w-full flex-col space-y-3 px-2">
            <div className="grid w-full gap-1.5">
                <Label htmlFor="profile">Profile</Label>
                <SelectInput
                    placeholder="Select a profile"
                    options={[{ items: portfolios.map((portfolio) => portfolio.name) }]}
                    value={selectedPortfolio?.name || ''}
                    onChange={(value) => {
                        const selected = portfolios.find((portfolio) => portfolio.name === value)
                        setSelectedPortfolio(selected)
                    }}
                />
            </div>
            {promptFields.length > 0 ? (
                promptFields.map((field) => renderField(field))
            ) : (
                <p>No fields available for this prompt</p>
            )}
            <Button onClick={handleSubmit} loading={isLoading} disabled={isLoading}>
                Submit
            </Button>
        </div>
    )
}
