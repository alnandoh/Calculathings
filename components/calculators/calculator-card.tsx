import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function CalculatorCard({
  title,
  description,
  icon: Icon,
  href,
}: CalculatorCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:bg-muted/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Icon className="w-10 h-10" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
