class AddTitleToChannel < ActiveRecord::Migration[8.0]
  def change
    change_table :users do |t|
      t.string :title
    end
  end
end
