import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "./Button";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  loading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-400 text-sm">
          {description}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
