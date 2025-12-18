// app/tools/[slug]/page.tsx
import { notFound } from "next/navigation"
import ToolPageFrame from "@/components/ToolPageFrame"
import { getTool } from "@/lib/tools"
import { toolComponents } from "@/lib/toolComponents"

type Props = { params: Promise<{ slug: string }> }

export default async function ToolPage({ params }: Props) {
  const { slug } = await params

  const tool = getTool(slug)
  if (!tool) notFound()

  const ToolComponent = toolComponents[slug]
  if (!ToolComponent) notFound()

  const related = tool.relatedSlugs
    .map((s) => getTool(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  return (
    <ToolPageFrame tool={tool} related={related}>
      <ToolComponent />
    </ToolPageFrame>
  )
}
