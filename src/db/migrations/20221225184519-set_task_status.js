module.exports = {
  async up(db, client) {
      await db.collection('tasks').updateMany({estimatedTime: { $lte: 10 }}, {$set: { status: 'done' }});
      await db.collection('tasks').updateMany({estimatedTime: { $gt: 10 }}, {$set: { status: 'in progress' }});
  },

  async down(db, client) {
      await db.collection('tasks').updateMany({}, { $unset: { "status": "" } });
  }
};
