-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
