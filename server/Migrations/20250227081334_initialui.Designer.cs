﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Dbcontext;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(AppDbcontext))]
    [Migration("20250227081334_initialui")]
    partial class initialui
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("server.Model.Taskset", b =>
                {
                    b.Property<int>("Task_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Addeddatetime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Task_description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Task_title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("iscompleted")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Task_ID");

                    b.ToTable("tasksets");
                });
#pragma warning restore 612, 618
        }
    }
}
