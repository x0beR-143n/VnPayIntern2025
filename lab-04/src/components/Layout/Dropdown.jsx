import React, { useState } from "react";

export default function DropDown({trigger, content}) {
    const [open, setOpen] = useState(false);

    // Clone trigger element và thêm onClick
    const clonedTrigger = React.cloneElement(trigger, {
        onClick: () => setOpen(!open),
    });

  return (
    <div className="relative inline-block">
      {clonedTrigger}
      {open && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
          {content}
        </div>
      )}
    </div>
  );
}