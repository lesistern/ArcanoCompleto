import { NodeViewWrapper } from '@tiptap/react';

export function StatblockView(props: any) {
  const { entryId, entryType } = props.node.attrs;
  // TODO: reemplazar con hook real al compendio
  return (
    <NodeViewWrapper className="statblock-card">
      <div className="statblock-header">
        <span className="statblock-type">{entryType}</span>
        <div className="statblock-title">Ref: {entryId || 'sin id'}</div>
      </div>
      <div className="statblock-body text-sm text-dungeon-200">
        (Renderiza aquí la ficha desde tu compendio)
      </div>
    </NodeViewWrapper>
  );
}
