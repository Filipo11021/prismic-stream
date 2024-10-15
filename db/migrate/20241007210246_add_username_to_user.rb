class AddUsernameToUser < ActiveRecord::Migration[8.0]
    def change
      change_table :users do |t|
        t.string :username, null: false
      end

      add_index :users, :username, unique: true
    end
end
