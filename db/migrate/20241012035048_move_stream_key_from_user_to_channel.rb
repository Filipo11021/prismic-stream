class MoveStreamKeyFromUserToChannel < ActiveRecord::Migration[8.0]
  def change
    change_table :channels do |t|
      t.string :stream_key
    end
    change_table :users do |t|
      t.remove :stream_key
    end
  end
end
