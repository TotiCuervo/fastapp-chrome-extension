import { useEffect, useState } from 'react'
import { ChevronDown, FileText } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '../../../../../components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select'
import usePortfoliosQuery from '../../../../../../src/lib/query/portfolios/usePortfoliosQuery'
import Button from '../../../../../../src/components/buttons/button'
import { useUserContext } from '../../../../../../src/lib/context/UserContext'

export default function HeaderSheet() {
    const { data: portfolios = [] } = usePortfoliosQuery()
    const { logout } = useUserContext()
    const [defaultPortfolioId, setDefaultPortfolioId] = useState<string | null>(null)

    // Fetch the default portfolio from chrome storage
    useEffect(() => {
        chrome.storage.sync.get(['defaultPortfolio'], (result) => {
            const storedPortfolioId = result.defaultPortfolio
            if (storedPortfolioId && portfolios.some((p) => String(p.id) === storedPortfolioId)) {
                setDefaultPortfolioId(storedPortfolioId)
            } else if (portfolios.length > 0) {
                // Default to the first portfolio if stored ID is invalid or not found
                const firstPortfolio = String(portfolios[0].id)
                setDefaultPortfolioId(firstPortfolio)
                chrome.storage.sync.set({ defaultPortfolio: firstPortfolio })
            }
        })
    }, [portfolios])

    // Update chrome storage when default portfolio changes
    const handleChangeDefaultPortfolio = (portfolioId: string) => {
        setDefaultPortfolioId(portfolioId)
        chrome.storage.sync.set({ defaultPortfolio: portfolioId })
    }

    const defaultPortfolio = portfolios.find((p) => String(p.id) === defaultPortfolioId)
    const noPortfolios = portfolios.length === 0

    return (
        <Sheet>
            <SheetTrigger className="-mr-1 flex items-center rounded-md px-2 transition hover:bg-accent hover:text-accent-foreground">
                <div className="flex w-56 flex-nowrap items-center space-x-1">
                    <FileText size={24} />
                    <span className="flex truncate text-nowrap">
                        {noPortfolios ? 'No Default Portfolio' : defaultPortfolio?.name || 'Default Portfolio'}
                    </span>
                    <div className="flex shrink grow flex-row-reverse">
                        <ChevronDown size={20} />
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-full flex-col">
                <SheetHeader>
                    <SheetTitle>Default Portfolio</SheetTitle>
                    <SheetDescription>
                        {noPortfolios
                            ? 'Please go to the web platform and create your first portfolio.'
                            : 'Select the portfolio you want to default to in the extension.'}
                    </SheetDescription>
                </SheetHeader>
                {!noPortfolios ? (
                    <div className="mt-4">
                        <Select value={defaultPortfolioId || ''} onValueChange={handleChangeDefaultPortfolio}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolios.map((portfolio) => (
                                    <SelectItem key={portfolio.id} value={String(portfolio.id)}>
                                        {portfolio.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <p className="mt-4 text-sm">No portfolios available. Please create one on the web platform.</p>
                )}
                {/* Spacer to push logout button to the bottom */}
                <div className="flex-grow"></div>
                <div className="w-full">
                    <Button variant="outline" className="w-full" onClick={() => logout()}>
                        Logout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
