﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PsychologicalAssistance.Core.Data.Configurations;
using PsychologicalAssistance.Core.Data.Entities;

namespace PsychologicalAssistance.Core.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Variant> Variants { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<TestResults> TestResults { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<ComputerGame> ComputerGames { get; set; }
        public DbSet<Music> Musics { get; set; }
        public DbSet<EmotionGenre> EmotionsGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>()
                .HasOne(q => q.Question)
                .WithMany();

            modelBuilder.Entity<TestResults>()
                .HasOne(u => u.User)
                .WithMany(t => t.TestResults);

            modelBuilder.Entity<TestResults>()
                .HasOne(t => t.Test)
                .WithMany();

            modelBuilder.Entity<Answer>()
                .HasOne(t => t.TestResults)
                .WithMany(a => a.Answers);

            //Наполнения базы данними
            // User
            /*modelBuilder.Entity<User>().HasData(
                new User { Id = "1", UserName = "Tom", UserSurname = "Ivanov", BirthDate = System.DateTime.Now, Email = "123123@sad" },
                new User { Id = "2", UserName = "Alice", UserSurname = "Denisov", BirthDate = System.DateTime.Now, Email = "dasdas@sad" },
                new User { Id = "3", UserName = "Sam", UserSurname = "Donikas", BirthDate = System.DateTime.Now, Email = "asdsadas3123@sad" }
            );*/
            //Film
            modelBuilder.Entity<Film>().HasData(
                new Film { Id = 1, Title = "The Godfather", Genre = Enums.FilmGenres.drama, Country = "USA", Year = new System.DateTime(1972), Language = "EN", VideoUrl = "google.com" },
                new Film { Id = 2, Title = "The Shawshank Redemption", Genre = Enums.FilmGenres.drama, Country = "USA", Year = new System.DateTime(1994), Language = "EN", VideoUrl = "www.facebook.com" },
                new Film { Id = 3, Title = "The Dark Knight", Genre = Enums.FilmGenres.action, Country = "USA", Year = new System.DateTime(2008), Language = "EN", VideoUrl = "www.twitter.com" }
            );
            //Book
            modelBuilder.Entity<Book>().HasData(
               new Book { Id = 1, Title = "How Beautiful We Were", Genre = Enums.BookGenres.Novel, Language = "EN", Author = "Imbolo Mbue" },
               new Book { Id = 2, Title = "Intimacies", Genre = Enums.BookGenres.Novel, Language = "EN", Author = "Katie Kitamura" },
               new Book { Id = 3, Title = "The Dark Hours", Genre = Enums.BookGenres.Detective, Language = "EN", Author = "Michael Connelly" }
            );
            //Questions
            modelBuilder.Entity<Question>().HasData(
               new Question { Id = 1, Formulation = "How are you? Your mood?", ImageUrl = "dasddsa@fsfdss" },
               new Question { Id = 2, Formulation = "What is your emotion now?", ImageUrl = "dasddsa@fsfdss" },
               new Question { Id = 3, Formulation = "How do you feel now?", ImageUrl = "dasddsa@fsfdss" }
            );

            //Возможный вариант наполнения вариантов ответа, но база данных не создает почему-то
            //Variants = new Variant[]{new Variant{Formulation = "Nice"},
            //new Variant{Formulation = "NotGooD"},
            //new Variant{Formulation = "Perfect"}}

            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}