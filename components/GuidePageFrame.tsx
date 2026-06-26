import Link from "next/link"
import type { Guide, GuideLink, GuideSection } from "@/lib/guides"

function GuideCardLink({
  item,
  className,
  children,
}: {
  item: GuideLink
  className: string
  children: React.ReactNode
}) {
  if (item.href.startsWith("http")) {
    return (
      <a href={item.href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  )
}

function SectionBlock({ section }: { section: GuideSection }) {
  return (
    <section className="border-t border-neutral-100 pt-10">
      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">
        {section.heading}
      </h2>

      {section.body && (
        <div className="mt-5 space-y-4 text-sm leading-8 text-neutral-700">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {section.list && (
        <ul className="mt-5 space-y-2 text-sm leading-7 text-neutral-700">
          {section.list.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.code && (
        <pre className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-5 text-sm leading-7 text-neutral-700">
          <code>{section.code}</code>
        </pre>
      )}

      {section.codeColumns && (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {section.codeColumns.map((item) => (
            <div key={item.label} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-xs font-bold text-neutral-500">
                {item.label}
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-7 text-neutral-700">
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {section.table && (
        <div className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-white">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-900">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} className="border-b border-neutral-200 px-4 py-3 font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {section.table.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`} className="px-4 py-3 leading-7">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.subsections && (
        <div className="mt-8 space-y-8">
          {section.subsections.map((subsection) => (
            <div key={subsection.heading}>
              <h3 className="text-base font-bold text-neutral-900">
                {subsection.heading}
              </h3>

              {subsection.body && (
                <div className="mt-4 space-y-4 text-sm leading-8 text-neutral-700">
                  {subsection.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              {subsection.list && (
                <ul className="mt-4 space-y-2 rounded-xl border border-neutral-200 bg-white p-5 text-sm leading-7 text-neutral-700">
                  {subsection.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {subsection.code && (
                <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-5 text-sm leading-7 text-neutral-700">
                  <code>{subsection.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default function GuidePageFrame({ guide }: { guide: Guide }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <header className="mb-12">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Benri Desk
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href="/guides" className="text-neutral-500 transition-colors hover:text-neutral-900">
            ガイド
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {guide.title}
        </h1>

        <div className="mt-5 space-y-3 text-base leading-8 text-neutral-600">
          {guide.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <article className="space-y-12">
        {guide.sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}
      </article>

      <section className="mt-16 border-t border-neutral-100 pt-10">
        <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">
          よくある質問
        </h2>
        <div className="mt-6 divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white">
          {guide.faqs.map((faq) => (
            <div key={faq.question} className="p-5">
              <h3 className="text-sm font-bold text-neutral-900">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-neutral-100 pt-10">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            関連ツール
          </h2>
          <div className="h-px flex-1 bg-neutral-100" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guide.relatedTools.map((tool) => (
            <GuideCardLink
              key={tool.href}
              item={tool}
              className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
            >
              <div className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
                {tool.label}
              </div>
              {tool.description && (
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  {tool.description}
                </p>
              )}
            </GuideCardLink>
          ))}
        </div>
      </section>

      {guide.relatedResources && guide.relatedResources.length > 0 && (
        <section className="mt-16 border-t border-neutral-100 pt-10">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              関連リソース
            </h2>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {guide.relatedResources.map((resource) => (
              <GuideCardLink
                key={resource.href}
                item={resource}
                className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
                  {resource.label}
                </div>
                {resource.description && (
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    {resource.description}
                  </p>
                )}
              </GuideCardLink>
            ))}
          </div>
        </section>
      )}

      {guide.relatedGuides.length > 0 && (
        <section className="mt-16 border-t border-neutral-100 pt-10">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              関連ガイド
            </h2>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {guide.relatedGuides.map((relatedGuide) => (
              <GuideCardLink
                key={relatedGuide.href}
                item={relatedGuide}
                className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
                  {relatedGuide.label}
                </div>
                {relatedGuide.description && (
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    {relatedGuide.description}
                  </p>
                )}
              </GuideCardLink>
            ))}
          </div>
        </section>
      )}

      <nav className="mt-16 border-t border-neutral-100 pt-10 text-center">
        <Link
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:text-neutral-900 hover:tracking-[0.3em]"
          href={guide.categoryHref}
        >
          ← {guide.categoryLabel}へ戻る
        </Link>
      </nav>
    </main>
  )
}
