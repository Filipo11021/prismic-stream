class CreateFollowsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :follows do |t|
      t.references :follower, null: false, foreign_key: { to_table: :users }
      t.references :followed_user, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :follows, [ :follower_id, :followed_user_id ], unique: true
  end
end
