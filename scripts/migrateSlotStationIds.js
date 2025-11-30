const mongoose = require('mongoose');
const Slot = require('../models/Slot');
const Station = require('../models/Station');

async function migrateSlotStationIds() {
  try {
    await mongoose.connect('mongodb://localhost:27017/parkpro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find all slots with string stationId
    const slots = await Slot.find({ stationId: { $type: 'string' } });
    console.log(`Found ${slots.length} slots with string stationId`);

    let migratedCount = 0;
    let errorCount = 0;

    for (const slot of slots) {
      try {
        // Find station by stationId string field
        const station = await Station.findOne({ stationId: slot.stationId });
        if (!station) {
          console.error(`Station not found for slot ${slot.slotId} with stationId ${slot.stationId}`);
          errorCount++;
          continue;
        }

        // Update slot to use ObjectId reference
        slot.stationId = station._id;
        await slot.save();
        migratedCount++;
        console.log(`Migrated slot ${slot.slotId} to use station ObjectId ${station._id}`);
      } catch (error) {
        console.error(`Error migrating slot ${slot.slotId}:`, error);
        errorCount++;
      }
    }

    console.log(`Migration completed: ${migratedCount} slots migrated, ${errorCount} errors`);

  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the migration
migrateSlotStationIds();
