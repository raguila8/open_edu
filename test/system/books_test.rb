require "application_system_test_case"

class BooksTest < ApplicationSystemTestCase
  setup do
    @book = books(:one)
  end

  test "visiting the index" do
    visit books_url
    assert_selector "h1", text: "Books"
  end

  test "creating a Book" do
    visit books_url
    click_on "New Book"

    fill_in "Description", with: @book.description
    fill_in "Level", with: @book.level
    fill_in "Num pages", with: @book.num_pages
    fill_in "Overview", with: @book.overview
    fill_in "Publication day", with: @book.publication_day
    fill_in "Publication month", with: @book.publication_month
    fill_in "Publication year", with: @book.publication_year
    fill_in "Publisher", with: @book.publisher
    fill_in "Source url", with: @book.source_url
    fill_in "Title", with: @book.title
    click_on "Create Book"

    assert_text "Book was successfully created"
    click_on "Back"
  end

  test "updating a Book" do
    visit books_url
    click_on "Edit", match: :first

    fill_in "Description", with: @book.description
    fill_in "Level", with: @book.level
    fill_in "Num pages", with: @book.num_pages
    fill_in "Overview", with: @book.overview
    fill_in "Publication day", with: @book.publication_day
    fill_in "Publication month", with: @book.publication_month
    fill_in "Publication year", with: @book.publication_year
    fill_in "Publisher", with: @book.publisher
    fill_in "Source url", with: @book.source_url
    fill_in "Title", with: @book.title
    click_on "Update Book"

    assert_text "Book was successfully updated"
    click_on "Back"
  end

  test "destroying a Book" do
    visit books_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Book was successfully destroyed"
  end
end
