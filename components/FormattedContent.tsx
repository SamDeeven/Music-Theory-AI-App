import React from 'react';

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Table
        if (line.trim().startsWith('|') && lines[i + 1]?.includes('---')) {
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                tableLines.push(lines[i]);
                i++;
            }

            if (tableLines.length >= 2) {
                const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
                const bodyRows = tableLines.slice(2).map(rowLine => 
                    rowLine.split('|').map(cell => cell.trim()).filter(Boolean)
                );

                elements.push(
                    <div key={`table-wrapper-${i}`} className="overflow-x-auto my-2 rounded-lg border border-brand-primary">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-brand-text uppercase bg-brand-primary">
                                <tr>
                                    {headers.map((header, hIndex) => (
                                        <th key={hIndex} scope="col" className="px-4 py-3">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {bodyRows.map((row, rIndex) => (
                                    <tr key={rIndex} className="bg-brand-surface border-b border-brand-primary last:border-b-0 hover:bg-brand-primary/20">
                                        {row.map((cell, cIndex) => (
                                            <td key={cIndex} className="px-4 py-3">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                continue;
            }
        }

        // Numbered list
        if (line.match(/^\d+\.\s/)) {
            const listItems = [];
            while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
                listItems.push(<li key={`li-${i}`}>{lines[i].substring(lines[i].indexOf('.') + 2)}</li>);
                i++;
            }
            elements.push(<ol key={`ol-${i}`} className="list-decimal pl-6 space-y-1 my-2">{listItems}</ol>);
            continue;
        }
        
        // Bulleted list
        if (line.match(/^[\*\-]\s/)) {
            const listItems = [];
            while (i < lines.length && lines[i].match(/^[\*\-]\s/)) {
                listItems.push(<li key={`li-${i}`}>{lines[i].substring(2)}</li>);
                i++;
            }
            elements.push(<ul key={`ul-${i}`} className="list-disc pl-6 space-y-1 my-2">{listItems}</ul>);
            continue;
        }

        // Heading heuristic: A relatively short line that doesn't end in punctuation.
        const isHeading = line.length > 0 && line.length < 60 && !['.', ':', ',', '?'].includes(line.slice(-1)) && isNaN(parseInt(line.charAt(0))) && !line.includes(' - ');
        if (isHeading) {
            elements.push(<h4 key={i} className="text-lg font-bold mt-3 mb-1 text-brand-secondary">{line}</h4>);
            i++;
            continue;
        }

        // Paragraphs
        elements.push(<p key={i} className="mb-2">{line}</p>);
        i++;
    }

    return <>{elements}</>;
};

export default FormattedContent;
