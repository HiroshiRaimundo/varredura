
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCircle, Check, X } from "lucide-react";
import { ReleaseData } from "../types/releaseTypes";
import { getStatusLabel } from "../utils/releaseUtils";

interface ReleaseDetailProps {
  viewingRelease: boolean;
  setViewingRelease: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRelease: ReleaseData | null;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({
  viewingRelease,
  setViewingRelease,
  selectedRelease,
  handleApprove,
  handleReject
}) => {
  if (!selectedRelease) return null;

  return (
    <Dialog open={viewingRelease} onOpenChange={setViewingRelease}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{selectedRelease.title}</DialogTitle>
          <DialogDescription>{selectedRelease.subtitle}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserCircle className="h-4 w-4" />
            <span>Autor: {selectedRelease.author}</span>
          </div>
          
          <div className="border-t pt-4">
            <div className="prose max-w-none">
              <p>{selectedRelease.content}</p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md mt-6">
            <h4 className="font-medium mb-2">Detalhes de publicação</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente:</span> {selectedRelease.clientName}
              </div>
              <div>
                <span className="text-muted-foreground">Veículo:</span> {selectedRelease.mediaOutlet || 'N/A'}
              </div>
              <div>
                <span className="text-muted-foreground">Data:</span> {selectedRelease.publicationDate || 'N/A'}
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span> {getStatusLabel(selectedRelease.status)}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          {selectedRelease.status === 'pending' && (
            <>
              <Button 
                onClick={() => {
                  handleApprove(selectedRelease.id);
                  setViewingRelease(false);
                }}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Aprovar e Enviar
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  handleReject(selectedRelease.id);
                  setViewingRelease(false);
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Rejeitar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReleaseDetail;
