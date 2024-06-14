import { cn } from "@/utils";

type Props = {
    className?: string
};

const Skelleton = ({ className }: Props) => {
    return (
        <div className={cn("animate-pulse bg-blue-300 ", className)} />
    );
};

export default Skelleton;