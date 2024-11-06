import { ReactNode } from "react";

interface IconWithLinkProps {
    className?: string
    icon: ReactNode
    href: string
}

const IconWithLink = ({ className, icon, href }: IconWithLinkProps) => (
    <a className={className} href={href} target="_blank" rel="noreferrer">
        {icon}
    </a>
)

export default IconWithLink
