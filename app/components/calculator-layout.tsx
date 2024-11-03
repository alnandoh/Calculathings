import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function CalculatorLayout({
  title,
  description,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Card>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
