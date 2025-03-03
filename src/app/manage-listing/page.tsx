import { Header } from '@/components/Header';
import { ListingEditor } from '@/components/ListingEditor';
import { Footer } from '@/components/Footer';

export default function ManageListingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="pt-24 pb-8">
        <ListingEditor />
      </div>
      <Footer />
    </main>
  );
}