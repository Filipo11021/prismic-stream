class AddStreamerKeyToUser < ActiveRecord::Migration[8.0]
  def change
    change_table :users do |t|
      t.string :stream_key
    end
  end
end
