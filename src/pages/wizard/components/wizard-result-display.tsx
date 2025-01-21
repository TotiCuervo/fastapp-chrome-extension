export default function WizardResultDisplay({ streamingResult }: { streamingResult: string }) {
    return (
        <div className="flex w-full grow overflow-auto rounded-md border bg-muted p-2">
            <pre className="w-full whitespace-pre-wrap break-words">{streamingResult}</pre>
        </div>
    )
}
