# frozen_string_literal: true

RSpec.describe "Compact Navigation Bar", system: true do
  let!(:theme) { upload_theme_component }
  fab!(:tag) { Fabricate(:tag, name: "bananas") }

  it "shows the dropdown when the everywhere setting is set" do
    theme.update_setting(:everywhere, true)
    theme.save!

    visit "/"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/categories"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/tag/bananas"

    expect(page).to have_css(".list-control-toggle-link-trigger")
  end

  it "shows the dropdown on category routes and /categories" do
    theme.update_setting(:on_category_pages, true)
    theme.save!

    visit "/c/1"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/categories"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/"

    expect(page).not_to have_css(".list-control-toggle-link-trigger")
  end

  it "shows the dropdown on tag pages" do
    theme.update_setting(:on_tag_pages, true)
    theme.save!

    visit "/tag/bananas"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/categories"

    expect(page).not_to have_css(".list-control-toggle-link-trigger")
  end

  it "shows the dropdown on the home page" do
    theme.update_setting(:on_home_page, true)
    theme.save!

    visit "/"

    expect(page).to have_css(".list-control-toggle-link-trigger")

    visit "/c/1"

    expect(page).not_to have_css(".list-control-toggle-link-trigger")
  end
end
