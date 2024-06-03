import Combobox, { ComboBoxGroups } from '../../../components/combobox/combobox'

export default function PromptCombobox() {
    const groups: ComboBoxGroups = [
        {
            label: 'Default',
            options: [
                { label: 'Unique Question', value: 'unique_question' },
                { label: 'Intro Email', value: 'intro_email' },
                { label: 'LinkedIn Intro', value: 'linkedin_intro' }
            ]
        },
        {
            label: 'Custom',
            options: []
        }
    ]
    return <Combobox groups={groups} value={null} onChange={(value) => console.log('consoling: ', value)} />
}
