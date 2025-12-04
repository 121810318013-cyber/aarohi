import { Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';

export const SizeGuide = () => {
  const sizeData = [
    { size: 'Free Size', bust: '32-40', waist: '28-36', length: '5.5m' },
    { size: 'Standard', bust: '34-42', waist: '30-38', length: '6.0m' },
    { size: 'Large', bust: '38-46', waist: '34-42', length: '6.3m' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
          <Ruler className="h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            Saree Size Guide
          </DialogTitle>
          <DialogDescription>
            Find your perfect fit with our size chart
          </DialogDescription>
        </DialogHeader>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Bust (in)</th>
                  <th className="px-4 py-3 text-left font-semibold">Waist (in)</th>
                  <th className="px-4 py-3 text-left font-semibold">Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, index) => (
                  <motion.tr 
                    key={row.size}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.bust}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.waist}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.length}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-accent">Tip:</span> Most of our sarees are Free Size and come with an unstitched blouse piece.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
