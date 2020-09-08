require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one)
  end

  test "should get index" do
    get books_url
    assert_response :success
  end

  test "should get new" do
    get new_book_url
    assert_response :success
  end

  test "should create book" do
    assert_difference('Book.count') do
      post books_url, params: { book: { description: @book.description, level: @book.level, num_pages: @book.num_pages, overview: @book.overview, publication_day: @book.publication_day, publication_month: @book.publication_month, publication_year: @book.publication_year, publisher: @book.publisher, source_url: @book.source_url, title: @book.title } }
    end

    assert_redirected_to book_url(Book.last)
  end

  test "should show book" do
    get book_url(@book)
    assert_response :success
  end

  test "should get edit" do
    get edit_book_url(@book)
    assert_response :success
  end

  test "should update book" do
    patch book_url(@book), params: { book: { description: @book.description, level: @book.level, num_pages: @book.num_pages, overview: @book.overview, publication_day: @book.publication_day, publication_month: @book.publication_month, publication_year: @book.publication_year, publisher: @book.publisher, source_url: @book.source_url, title: @book.title } }
    assert_redirected_to book_url(@book)
  end

  test "should destroy book" do
    assert_difference('Book.count', -1) do
      delete book_url(@book)
    end

    assert_redirected_to books_url
  end
end
