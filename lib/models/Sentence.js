const pool = require ('../utils/pool');

module.exports = class Sentence {
  id;
  toxcity;

  constructor(row){
    this.id = row.id;
    this.toxcity = row.boolean;
  }
  static async insert(toxicity){
    const { rows } =
      await pool.query(
        'INSERT INTO sentences(toxcity) Values ($1)RETURNING *',
        [toxicity]
      );
    return new Sentence (rows[0]);
  }
};
