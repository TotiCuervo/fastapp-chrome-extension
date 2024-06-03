import React from 'react'
import PromptCombobox from './components/prompt-combobox'
import Button from '../../components/buttons/button'
import { Label } from '../../../src/components/ui/label'
import { Textarea } from '../../../src/components/ui/textarea'
import { Input } from '../../../src/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '../../../src/components/ui/select'

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex items-center space-x-4 border-b p-5">
                <p className="font-semibold">Prompt</p>
                <PromptCombobox />
                <Button variant="secondary">Save</Button>
            </div>
            <div className="flex flex-1 space-x-4 p-5">
                <div className="flex w-7/12 flex-col space-y-3">
                    <div className="flex w-full grow rounded-md border bg-muted p-2"></div>
                </div>
                <div className="w-5/12">
                    <div className="flex h-full w-full flex-col space-y-3 px-2">
                        <div className="flex grow flex-col space-y-3">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="firstName">Profile</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a profile" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="firstName">Question</Label>
                                <Textarea id="firstName" placeholder="Question" className="min-h-[40px]" />
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="firstName">Instructions</Label>
                                <Textarea id="firstName" placeholder="Instructions" className="min-h-[40px]" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="firstName">Feedback</Label>
                                <Textarea id="firstName" placeholder="Feedback" className="min-h-[40px]" />
                            </div>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
