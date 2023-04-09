#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
struct User {
    char name[50];
    char phone[15];
    char id[9];
};

// Function to generate a unique ID for each user
void generateID(struct User *user) {
    char *name = user->name;
    char *phone = user->phone;

    // Get first 4 characters of name
    char firstFour[5];
    strncpy(firstFour, name, 4);
    firstFour[4] = '\0';

    // Get last 4 digits of phone number
    char lastFour[5];
    strncpy(lastFour, phone + strlen(phone) - 4, 4);
    lastFour[4] = '\0';

    // Concatenate first four of name and last four of phone number
    strcpy(user->id, firstFour);
    strcat(user->id, lastFour);
}

void addRecord(struct User *users, int *count) {
    printf("Enter name: ");
    scanf("%s", users[*count].name);

    printf("Enter phone number: ");
    scanf("%s", users[*count].phone);

    // Check if phone number is valid
    int len = strlen(users[*count].phone);
    for (int i = 0; i < len; i++) {
        if (!isdigit(users[*count].phone[i])) {
            printf("Invalid phone number.\n");
            return;
        }
    }

    // Generate unique ID for user
    generateID(&users[*count]);

    (*count)++;
    
    // Write updated records to file
    FILE *fp;
    fp = fopen("records.txt", "w");

    for (int i = 0; i < *count; i++) {
        fprintf(fp, "%s,%s,%s\n", users[i].name, users[i].phone, users[i].id);
    }

    fclose(fp);
}

void deleteRecord(struct User *users, int *count) {
    if (*count == 0) {
        printf("No records to delete.\n");
        return;
    }

    printf("Enter ID of record to delete: ");
    char id[9];
    scanf("%s", id);

    for (int i = 0; i < *count; i++) {
        if (strcmp(users[i].id, id) == 0) {
            // Shift all records after the deleted one
            for (int j = i + 1; j < *count; j++) {
                users[j-1] = users[j];
            }

            (*count)--;

            // Write updated records to file
            FILE *fp;
            fp = fopen("records.txt", "w");

            for (int i = 0; i < *count; i++) {
                fprintf(fp, "%s,%s,%s\n", users[i].name, users[i].phone, users[i].id);
            }

            fclose(fp);

            printf("Record with ID %s has been deleted.\n", id);
            return;
        }
    }

    printf("No record with ID %s found.\n", id);
}

void findRecord(struct User *users, int count) {
    if (count == 0) {
        printf("No records to find.\n");
        return;
    }

    printf("Enter ID of record to find: ");
    char id[9];
    scanf("%s", id);

    for (int i = 0; i < count; i++) {
        if (strcmp(users[i].id, id) == 0) {
            printf("Name: %s\n", users[i].name);
            printf("Phone: %s\n", users[i].phone);
            printf("ID: %s\n", users[i].id);
            return;
        }
    }

    printf("No record with ID %s found.\n", id);
}

int main() {
    struct User users[100];
    int count = 0;

    // Read records from file
    FILE *fp;
    fp = fopen("records.txt", "r");

    if (fp != NULL) {
        char line[100];

        while (fgets(line, sizeof(line), fp)) {
            char *name = strtok(line, ",");
            char *phone = strtok(NULL, ",");
            char *id = strtok(NULL, ",");
            id[strcspn(id, "\r\n")] = 0;

            strcpy(users[count].name, name);
            strcpy(users[count].phone, phone);
            strcpy(users[count].id, id);

            count++;
        }

        fclose(fp);
    }

    int choice;
    while (1) {
        printf("\nEnter choice:\n");
        printf("1. Add record\n");
        printf("2. Delete record\n");
        printf("3. Find record\n");
        printf("4. Exit\n");

        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addRecord(users, &count);
                break;
            case 2:
                deleteRecord(users, &count);
                break;
            case 3:
                findRecord(users, count);
                break;
            case 4:
                // Write records to file before exiting
                fp = fopen("records.txt", "w");

                for (int i = 0; i < count; i++) {
                    fprintf(fp, "%s,%s,%s\n", users[i].name, users[i].phone, users[i].id);
                }

                fclose(fp);

                return 0;
            default:
                printf("Invalid choice.\n");
                break;
        }
    }

    return 0;
}
