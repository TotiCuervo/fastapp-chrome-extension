import { Input } from '../../../../components/ui/input'
import Button from '../../../../components/buttons/button'
import { SearchIcon, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../lib/consts/routes'
import HeaderSheet from './components/header-sheet'

interface IProps {
    searchText: string
    setSearchText: (text: string) => void
}

export default function Header({ searchText, setSearchText }: IProps) {
    const navigate = useNavigate()

    return (
        <div className="flex w-full gap-4 border-b py-2 pl-2 pr-4">
            <HeaderSheet />

            <div className="flex grow">
                <Input
                    className="h-9"
                    left={<SearchIcon />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <Button size="sm" onClick={() => navigate(ROUTES.WIZARD)}>
                <div className="pr-1">
                    <Sparkles size={16} />
                </div>
                Wizard
            </Button>
        </div>
    )
}
