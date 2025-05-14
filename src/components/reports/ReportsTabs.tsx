import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TransactionSummaryTab } from './TransactionSummaryTab';
import { ChannelPerformanceTab } from './ChannelPerformanceTab';
import { PaymentMethodTab } from './PaymentMethodTab';
import { RefundsChargebacksTab } from './RefundsChargebacksTab';
import { ReportDownloadsTab } from './ReportDownloadsTab';
import { StoreRegionBreakdownTab } from './StoreRegionBreakdownTab';

export const ReportsTabs = ({ userRole }: { userRole: string }) => {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="summary">Transaction Summary</TabsTrigger>
        <TabsTrigger value="channel">Channel Performance</TabsTrigger>
        <TabsTrigger value="payment">Payment Method</TabsTrigger>
        <TabsTrigger value="refunds">Refunds & Chargebacks</TabsTrigger>
        <TabsTrigger value="downloads">Report Downloads</TabsTrigger>
        <TabsTrigger value="store">Store/Region Breakdown</TabsTrigger>
      </TabsList>
      <TabsContent value="summary"><TransactionSummaryTab userRole={userRole} /></TabsContent>
      <TabsContent value="channel"><ChannelPerformanceTab userRole={userRole} /></TabsContent>
      <TabsContent value="payment"><PaymentMethodTab userRole={userRole} /></TabsContent>
      <TabsContent value="refunds"><RefundsChargebacksTab userRole={userRole} /></TabsContent>
      <TabsContent value="downloads"><ReportDownloadsTab userRole={userRole} /></TabsContent>
      <TabsContent value="store"><StoreRegionBreakdownTab userRole={userRole} /></TabsContent>
    </Tabs>
  );
}; 