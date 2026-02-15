import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Technologie", value: 14, color: "#3B82F6" },
  { name: "Business", value: 9, color: "#10B981" },
  { name: "Design", value: 7, color: "#8B5CF6" },
  { name: "Marketing", value: 4, color: "#F59E0B" },
];

export default function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Articles par catégorie</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ul className="space-y-2">
            {data.map(({ name, value, color }) => (
              <li key={name} className="flex items-center gap-2 text-sm">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">{name}</span>
                <span className="font-medium ml-auto">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
